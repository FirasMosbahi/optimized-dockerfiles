package com.example;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.http.HttpServer;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.healthchecks.HealthCheckHandler;
import io.vertx.ext.healthchecks.Status;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MainVerticle extends AbstractVerticle {

    private static final Logger logger = LoggerFactory.getLogger(MainVerticle.class);
    private static final int PORT = 8080;

    @Override
    public void start(Promise<Void> startPromise) {
        Router router = Router.router(vertx);

        // Add body handler
        router.route().handler(BodyHandler.create());

        // API routes
        router.get("/api/hello").handler(this::handleHello);
        router.get("/api/health").handler(this::handleHealth);

        // Health check endpoint
        HealthCheckHandler healthCheckHandler = HealthCheckHandler.create(vertx);
        healthCheckHandler.register("server", promise -> {
            promise.complete(Status.OK());
        });
        router.get("/health").handler(healthCheckHandler);

        // Create HTTP server
        HttpServer server = vertx.createHttpServer();

        server
            .requestHandler(router)
            .listen(PORT)
            .onSuccess(http -> {
                logger.info("HTTP server started on port {}", PORT);
                startPromise.complete();
            })
            .onFailure(error -> {
                logger.error("Failed to start HTTP server", error);
                startPromise.fail(error);
            });
    }

    private void handleHello(RoutingContext context) {
        JsonObject response = new JsonObject()
            .put("message", "Hello from Vert.x!")
            .put("framework", "Vert.x")
            .put("status", "success")
            .put("timestamp", System.currentTimeMillis());

        context.response()
            .putHeader("Content-Type", "application/json")
            .end(response.encode());
    }

    private void handleHealth(RoutingContext context) {
        JsonObject response = new JsonObject()
            .put("status", "healthy");

        context.response()
            .putHeader("Content-Type", "application/json")
            .end(response.encode());
    }
}
