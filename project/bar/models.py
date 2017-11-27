from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
# Create your models here.

class Bar(models.Model):
	name = models.CharField(max_length=30)
	location = models.CharField(max_length=20)
	added_at = models.DateTimeField(default=timezone.now)
	updated_at = models.DateTimeField()
	user = models.ForeignKey(User)

	votes = GenericRelation(
		'bar.Vote', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='bars'
	)

	def save(self, *args, **kwargs):
		self.updated_at = timezone.now()
		super().save(*args, **kwargs)	

#multi choice field relating to HH duration for day of the week? 
#Or should it be part of the drink deal

class Drink(models.Model):
	name = models.CharField(max_length=20)
	price = models.FloatField()
	added_at = models.DateTimeField(default=timezone.now)
	updated_at = models.DateTimeField()
	user = models.ForeignKey(User)
	bar = models.ForeignKey(Bar)

	votes = GenericRelation(
		'bar.Vote', 
		object_id_field='object_id', 
		content_type_field='content_type',
		related_query_name='drinks'
	)

	def save(self, *args, **kwargs):
		self.updated_at = timezone.now()
		super().save(*args, **kwargs)

class Vote(models.Model):
	LIKE = "L"
	DISLIKE = "D"
	CHOICES = (
		(LIKE, "Like"), (DISLIKE, "Dislike")
	)
	activity = models.CharField(max_length=2, choices=CHOICES)
	user = models.ForeignKey(User)
	voted_at = models.DateTimeField(default=timezone.now)

	content_type = models.ForeignKey(ContentType)
	object_id = models.PositiveIntegerField()
	target = GenericForeignKey('content_type', 'object_id')




