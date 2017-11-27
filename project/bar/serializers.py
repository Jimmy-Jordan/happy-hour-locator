from rest_framework import serializers
from bar.models import Bar, Drink, Vote

class DrinkDetailSerializer(serializers.ModelSerializer):

	user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)


	updated_at = serializers.DateTimeField(
		read_only=True,
	)

	create_vote = serializers.HyperlinkedIdentityField(view_name='bar:drink-votes')

	class Meta:
		model = Drink
		fields = [
			'name', 'price', 'bar', 
			'create_vote', 'id', 'user',
			'updated_at'
		]

class BarDetailSerializer(serializers.ModelSerializer):

	add_drink = serializers.HyperlinkedIdentityField(view_name='bar:drinks')

	create_vote = serializers.HyperlinkedIdentityField(view_name='bar:bar-votes')

	user = serializers.SlugRelatedField(
		many=False,
		read_only=True,
		slug_field='username'
	)

	updated_at = serializers.DateTimeField(
		read_only=True,
	)

	class Meta:
		model = Bar
		fields = [
			'url', 'name', 'location', 
			'create_vote','add_drink', 
			'id', 'user', 'updated_at'
		]
		
		extra_kwargs = {
			"url": {"view_name": "bar:bar-detail"}
		}		



class VoteDetailSerializer(serializers.ModelSerializer):

	class Meta:
		model = Vote
		fields = ['activity']		