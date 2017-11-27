from rest_framework import permissions

class BarIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Bar object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user	

class DrinkIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Drink object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user	

class VoteIsOwnerOrReadOnly(permissions.BasePermission):
	'''
	Custom permission to allow owners of a Vote object to edit it.
	'''
	def has_object_permission(self, request, view, obj):
		if request.method in permissions.SAFE_METHODS:
			return True
		return request.user == obj.user