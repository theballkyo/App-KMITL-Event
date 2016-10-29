from django.http import QueryDict
 
class HttpPostTunnelingMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        request.PUT = False
        request.DELETE = False
        if 'HTTP_X_METHODOVERRIDE' in request.META:
            http_method = request.META['HTTP_X_METHODOVERRIDE']
            if http_method.lower() == 'put':
                request.method = 'PUT'
                request.META['REQUEST_METHOD'] = 'PUT'
                request.PUT = QueryDict(request.body)
            if http_method.lower() == 'delete':
                request.method = 'DELETE'
                request.META['REQUEST_METHOD'] = 'DELETE'
                request.DELETE = QueryDict(request.body)
        
        response = self.get_response(request)
        return response
