using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WebServer
{
    class Routes
    {
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
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\template\\login.html";
            string login_page = File.ReadAllText(filePath);
            return string.Format(login_page);
        }

        public static string Signup(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\template\\signup.html";
            string login_page = File.ReadAllText(filePath);
            return string.Format(login_page);
        }

        public static string Dashboard(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\template\\dashboard.html";
            string login_page = File.ReadAllText(filePath);
            return string.Format(login_page);
        }

        public static string Error404(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\template\\404.html";
            string login_page = File.ReadAllText(filePath);
            return string.Format(login_page);
        }


        ////////ROUTES CSS

        public static string Css_Base(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\css\\base.css";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }

        public static string Css_Login(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\css\\login.css";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }

        public static string Css_Dashboard(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\css\\dashboard.css";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }

        public static string Css_Header(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\css\\header.css";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }

        public static string Css_404(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\css\\404.css";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }


        ////////ROUTES JS

        public static string Js_Dashboard(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\js\\dashboard.js";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }

        public static string Js_Signup(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\js\\signup.js";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }

        public static string Js_Login(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\js\\login.js";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }
    }
}
