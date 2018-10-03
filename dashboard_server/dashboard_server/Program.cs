using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;

namespace WebServer
{
    public class WebServer
    {
        private readonly HttpListener _listener = new HttpListener();
        private readonly Func<HttpListenerRequest, string> _responderMethod;

        public WebServer(IReadOnlyCollection<string> prefixes, Func<HttpListenerRequest, string> method)
        {

            // URI prefixes are required eg: "http://localhost:8080/test/"
            if (prefixes == null || prefixes.Count == 0)
            {
                throw new ArgumentException("URI prefixes are required");
            }

            if (method == null)
            {
                throw new ArgumentException("responder method required");
            }

            foreach (var s in prefixes)
            {
                _listener.Prefixes.Add(s);
            }

            _responderMethod = method;
            _listener.Start();
        }

        public WebServer(Func<HttpListenerRequest, string> method, params string[] prefixes)
           : this(prefixes, method)
        {
        }

        public void Run()
        {
            ThreadPool.QueueUserWorkItem(o =>
            {
                Console.WriteLine("Webserver running...");
                try
                {
                    while (_listener.IsListening)
                    {
                        ThreadPool.QueueUserWorkItem(c =>
                        {
                            var ctx = c as HttpListenerContext;
                            try
                            {
                                if (ctx == null)
                                {
                                    return;
                                }

                                var rstr = _responderMethod(ctx.Request);
                                var buf = Encoding.UTF8.GetBytes(rstr);
                                ctx.Response.ContentLength64 = buf.Length;
                                ctx.Response.OutputStream.Write(buf, 0, buf.Length);
                            }
                            catch
                            {
                                // ignored
                            }
                            finally
                            {
                                // always close the stream
                                if (ctx != null)
                                {
                                    ctx.Response.OutputStream.Close();
                                }
                            }
                        }, _listener.GetContext());
                    }
                }
                catch (Exception ex)
                {
                    // ignored
                }
            });
        }

        public void Stop()
        {
            _listener.Stop();
            _listener.Close();
        }
    }

    public class Route
    {
        public string my_route { get; set; }
        public Action functionPTR { get; set; }

        public Route(string key, Action value)
        {
            my_route = key;
            functionPTR = value;
        }
    }

    public class Routing
    {
        private List<Route> route_map = new List<Route>();

        /*private void test1()
        {
            Console.WriteLine("test 1 ok");
        }*/

        public Routing()
        {
            //route_map.Add(new Route("lol", test1));
            //route_map[0].functionPTR();

        }

        ~Routing()
        {

        }
    }


    internal class Program
    {

        public static string process_request(HttpListenerRequest request)
        {

            //var route = new Routing();

            Console.WriteLine(request);

            var response = "<HTML><BODY>TA GEULE PUTAIN.<br>" + DateTime.Now;

            response += "<br><br>KeepAlive: " + request.KeepAlive;
            response += "<br>Local end point: " + request.LocalEndPoint.ToString();
            response += "<br>Remote end point: " + request.RemoteEndPoint.ToString();
            response += "<br>Is local? " + request.IsLocal;
            response += "<br>HTTP method: " + request.HttpMethod;
            response += "<br>Protocol version: " + request.ProtocolVersion;
            response += "<br>Is authenticated: " + request.IsAuthenticated;
            response += "<br>Is secure: " + request.IsSecureConnection;
            response += "</BODY></HTML>";


            Console.WriteLine("URL: {0}", request.Url.OriginalString);
            Console.WriteLine("Raw URL: {0}", request.RawUrl);
            Console.WriteLine("Host address: {0}", request.UserHostAddress);

            return string.Format(response);
        }

        private static void Main(string[] args)
        {
            var ws = new WebServer(process_request, "http://localhost:8080/");
            ws.Run();
            Console.WriteLine("A simple webserver. Press a key to quit.");
            Console.ReadKey();
            ws.Stop();
        }
    }
}


