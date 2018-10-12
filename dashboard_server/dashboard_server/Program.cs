using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

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

    public class RouteAsync
    {
        public string my_route { get; set; }
        public Func<HttpListenerRequest, Task<string>> functionPTR { get; set; }

        public RouteAsync(string key, Func<HttpListenerRequest, Task<string>> value)
        {
            my_route = key;
            functionPTR = value;
        }
    }

    internal class Program
    {
        static private List<Route> route_map = new List<Route>();
        static private List<RouteAsync> routeAsync_map = new List<RouteAsync>();

        public static string Process_request(HttpListenerRequest request)
        {
            foreach (Route element in route_map)
            {
                if (element.my_route == request.RawUrl)
                {
                    return element.functionPTR(request);
                }
            }
            foreach (RouteAsync element in routeAsync_map)
            {
                if (request.RawUrl.Contains(element.my_route))
                {
                    var ret = element.functionPTR(request);
                    return (ret.Result);
                }
            }
            return (Routes.Error404(request));
        }

        private static void Main(string[] args)
        {
            route_map.Add(new Route("/", Routes.Default_index));
            route_map.Add(new Route("/about.json", Routes.About_json));
            route_map.Add(new Route("/login", Routes.Login));
            route_map.Add(new Route("/signup", Routes.Signup));
            route_map.Add(new Route("/dashboard", Routes.Dashboard));
            route_map.Add(new Route("/404", Routes.Error404)); 

            route_map.Add(new Route("/css/base.css", Routes.Css_Base));
            route_map.Add(new Route("/css/registration.css", Routes.Css_Registration));
            route_map.Add(new Route("/css/dashboard.css", Routes.Css_Dashboard));
            route_map.Add(new Route("/css/header.css", Routes.Css_Header));
            route_map.Add(new Route("/css/404.css", Routes.Css_404));
  
            route_map.Add(new Route("/js/dashboard.js", Routes.Js_Dashboard));
            route_map.Add(new Route("/js/signup.js", Routes.Js_Signup));
            route_map.Add(new Route("/js/login.js", Routes.Js_Login));
            route_map.Add(new Route("/js/widgets.js", Routes.Js_Widgets));

            route_map.Add(new Route("/?/signup", Serialize_data.Process_signup));
            route_map.Add(new Route("/?/login", Serialize_data.Process_login));
            route_map.Add(new Route("/?/user_config", Serialize_data.Process_login));

            routeAsync_map.Add(new RouteAsync("/API/meteo", Widgets.MeteoAsync));
            routeAsync_map.Add(new RouteAsync("/API/crypto", Widgets.CryptoAsync));
            routeAsync_map.Add(new RouteAsync("/API/YTB/channel", Widgets.YTB_statsAsync));
            routeAsync_map.Add(new RouteAsync("/API/YTB/vod", Widgets.YTB_vodAsync));
            routeAsync_map.Add(new RouteAsync("/API/twitch/streamer", Widgets.twitch_streamerAsync));
            routeAsync_map.Add(new RouteAsync("/API/twitch/game", Widgets.twitch_gameAsync));
            routeAsync_map.Add(new RouteAsync("/API/steam/game", Widgets.steam_gameAsync));
            routeAsync_map.Add(new RouteAsync("/API/steam/user", Widgets.steam_friendAsync));
            routeAsync_map.Add(new RouteAsync("/API/sc2/profile", Widgets.blizzard_sc2_profilAsync));

            var ws = new WebServer(Process_request, "http://+:8080/"); // "http://localhost:8080/");
            ws.Run();
            Console.WriteLine("A simple webserver. Press a key to quit.");
            Console.ReadKey();
            ws.Stop();
        }
    }
}


