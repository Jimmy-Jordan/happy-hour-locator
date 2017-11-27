from django.shortcuts import render, redirect

from django.contrib.auth import authenticate, login, get_user_model, logout

from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

from django.views.generic import View
from django.conf import settings


# Create your views here.

User = get_user_model()


class Index(View):

	
	def get(self, request):

		users = User.objects.all()

		context = {
			'user':users
		}

		return render(request, 'user/index.html', context)

class LoginView(View):

	def get(self, request):
		form = AuthenticationForm()

		context = {
			'form':form
		}


		return render(request, 'user/login.html', context)

	def post(self, request):

		form = AuthenticationForm(request, request.POST)

		context = {
			'form':form
		}

		if form.is_valid():
			user = form.get_user()
			login(request, user)
			return redirect(settings.LOGIN_SUCCESS_URL)

		else:
			return render(request, 'user/login.html', context)
			


class Logout(View):


	def post(self, request):

		logout(request)
		return redirect('user:index')

class Create(View):

	form_class = UserCreationForm

	def get(self, request):

		form = self.form_class()
		context = {
			'form': form
		}

		return render(request, 'user/create.html', context)

	def post(self, request):

		form = self.form_class(request.POST)

		context = {
			'form': form
		}

		if form.is_valid():
			user = form.save()
			return redirect('user:index')

		else:
			return render(request, 'user/create.html', context)

