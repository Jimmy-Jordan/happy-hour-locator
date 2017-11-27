from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions


from bar.models import Bar, Drink, Vote
from bar.serializers import (
	DrinkDetailSerializer, BarDetailSerializer,
	VoteDetailSerializer
)
from bar.permissions import (
	BarIsOwnerOrReadOnly, DrinkIsOwnerOrReadOnly, 
	VoteIsOwnerOrReadOnly
)	

class BarListView(generics.ListCreateAPIView):
	queryset = Bar.objects.all()
	serializer_class = BarDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)

class BarDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Bar.objects.all()
	serializer_class = BarDetailSerializer
	permission_classes = (BarIsOwnerOrReadOnly,)


class BarDrinksListView(generics.ListCreateAPIView):
	queryset = Drink.objects.all()
	serializer_class = DrinkDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_bar(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Bar, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(bar=self.get_bar())
		return queryset

	def perform_create(self, serializer):
		bar = self.get_bar()
		serializer.save(user=self.request.user, bar=bar)


class DrinkDetail(generics.RetrieveUpdateDestroyAPIView):
	queryset = Drink.objects.all()
	serializer_class = DrinkDetailSerializer
	permission_classes = (DrinkIsOwnerOrReadOnly,)

	def get_serializer(self, *args, **kwargs):
		"""
		Return the serializer instance that should be used for validating and
		deserializing input, and for serializing output.
		"""
		serializer_class = self.get_serializer_class()
		kwargs['context'] = self.get_serializer_context()
		if "data" in kwargs:
			kwargs['data']['bar'] = self.get_bar().id
		return serializer_class(*args, **kwargs)
	
	def get_bar(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Bar, id=pk)

class BarVoteListView(generics.ListCreateAPIView):
	queryset = Vote.objects.all()
	serializer_class = VoteDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_bar(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Bar, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(bars=self.get_bar())
		return queryset

	def perform_create(self, serializer):
		target = self.get_bar()
		defaults = serializer.data
		defaults.update(dict(target=target))
		obj, created = Vote.objects.update_or_create(
			bars__id=target.id, user=self.request.user,
			defaults=defaults
		)


class DrinkVoteListView(generics.ListCreateAPIView):
	queryset = Vote.objects.all()
	serializer_class = VoteDetailSerializer
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

	def get_drink(self):
		pk = self.kwargs.get('pk')
		return get_object_or_404(Drink, id=pk)

	def get_queryset(self):
		queryset = super().get_queryset()
		queryset = queryset.filter(drinks=self.get_drink())
		return queryset

	def perform_create(self, serializer):
		target = self.get_drink()
		defaults = serializer.data
		defaults.update(dict(target=target))
		obj, created = Vote.objects.update_or_create(
			drinks__id=target.id, user=self.request.user,
			defaults=defaults
		)		