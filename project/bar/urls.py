"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^bars$', views.BarListView.as_view(), name="bars"),
    url(r'^bars/(?P<pk>[0-9]+)$', views.BarDetail.as_view(), name="bar-detail"),
    url(r'^bars/(?P<pk>[0-9]+)/drinks$', views.BarDrinksListView.as_view(), name="drinks"),
    url(r'^drinks/(?P<pk>[0-9]+)$', views.DrinkDetail.as_view(), name="drink-detail"),
    url(r'^bars/(?P<pk>[0-9]+)/votes$', views.BarVoteListView.as_view(), name="bar-votes"),
    url(r'^drinks/(?P<pk>[0-9]+)/votes$', views.DrinkVoteListView.as_view(), name="drink-votes"),
]

urlpatterns = format_suffix_patterns(urlpatterns)