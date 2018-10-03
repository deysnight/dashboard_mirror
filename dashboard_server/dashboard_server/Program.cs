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

            // URI prefixes are required eg: "http://localhost:8080"
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
        public Func<HttpListenerRequest, string> functionPTR { get; set; }

        public Route(string key, Func<HttpListenerRequest, string> value)
        {
            my_route = key;
            functionPTR = value;
        }
    }

    internal class Program
    {
        static private List<Route> route_map = new List<Route>();

        public static string Default_index(HttpListenerRequest request)
        {

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

            return string.Format(response);
        }

        public static string About_json(HttpListenerRequest request)
        {
            var response = "ON A PAS ENCORE FAIT CALMES TOI FDP";
            return string.Format(response);
        }

        public static string Login(HttpListenerRequest request)
        {
            var response = "JE T'AI PAS AUTORISE A TE LOG ENCULER";
            return string.Format(response);
        }

        public static string Process_request(HttpListenerRequest request)
        {
            foreach (Route element in route_map)
            {
                if (element.my_route == request.RawUrl)
                {
                    return element.functionPTR(request);
                }
            }
            return ("404 error mdr");
        }

        private static void Main(string[] args)
        {
            route_map.Add(new Route("/", Default_index));
            route_map.Add(new Route("/about.json", About_json));
            route_map.Add(new Route("/login", Login));


            var ws = new WebServer(Process_request, "http://+:8080/"); // "http://localhost:8080/");
            ws.Run();
            Console.WriteLine("A simple webserver. Press a key to quit.");
            Console.ReadKey();
            ws.Stop();
        }
    }
}


