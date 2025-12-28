from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

urlpatterns = [
    path('', views.root, name='root'),
    path('health/', views.health_check, name='health'),
    path('api/', include(router.urls)),
]
