const { userSchema, createUserSchema, updateUserSchema } = require('../schemas/user');

// In-memory store (for demo purposes)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

async function userRoutes(fastify, options) {
  // GET all users
  fastify.get('/', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: userSchema
        }
      }
    }
  }, async (request, reply) => {
    return users;
  });

  // GET user by ID
  fastify.get('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      response: {
        200: userSchema,
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const user = users.find(u => u.id === parseInt(request.params.id));
    if (!user) {
      reply.code(404);
      return { error: 'User not found' };
    }
    return user;
  });

  // POST create user
  fastify.post('/', {
    schema: {
      body: createUserSchema,
      response: {
        201: userSchema
      }
    }
  }, async (request, reply) => {
    const { name, email } = request.body;

    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      email
    };

    users.push(newUser);
    reply.code(201);
    return newUser;
  });

  // PUT update user
  fastify.put('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      body: updateUserSchema,
      response: {
        200: userSchema,
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const user = users.find(u => u.id === parseInt(request.params.id));
    if (!user) {
      reply.code(404);
      return { error: 'User not found' };
    }

    const { name, email } = request.body;
    if (name) user.name = name;
    if (email) user.email = email;

    return user;
  });

  // DELETE user
  fastify.delete('/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      response: {
        204: {
          type: 'null',
          description: 'No content'
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const index = users.findIndex(u => u.id === parseInt(request.params.id));
    if (index === -1) {
      reply.code(404);
      return { error: 'User not found' };
    }

    users.splice(index, 1);
    reply.code(204);
    return;
  });
}

module.exports = userRoutes;
