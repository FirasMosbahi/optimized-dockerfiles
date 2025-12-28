from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer


@api_view(['GET'])
def root(request):
    """Root endpoint."""
    return Response({"message": "Hello, world!"})


@api_view(['GET'])
def health_check(request):
    """Health check endpoint."""
    return Response({"status": "healthy"}, status=status.HTTP_200_OK)


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User CRUD operations."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
