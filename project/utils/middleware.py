import sys


from django.utils.deprecation import MiddlewareMixin



class FlushWare( MiddlewareMixin ):
    def process_response( self, request, response ):
        sys.stdout.flush()
        sys.stderr.flush()
        return response