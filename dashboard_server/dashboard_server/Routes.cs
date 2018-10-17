using Newtonsoft.Json;
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
            return (Login(request));
        }

        public static string About_json(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\about.json";
            dynamic about = JsonConvert.DeserializeObject(File.ReadAllText(filePath));
            about.client.host = request.RemoteEndPoint.ToString().Split(':')[0];
            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            int secondsSinceEpoch = (int)t.TotalSeconds;
            about.server.current_time = secondsSinceEpoch;
            return JsonConvert.SerializeObject(about);
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

        public static string B_oauth(HttpListenerRequest request)
        {
            string[] tmp = request.RawUrl.Split(new Char[] { '=', '&' });
            Program.blizzard_token = tmp[1];
            Console.WriteLine(tmp[1]);
            string page = "<!DOCTYPE html><html lang='fr'><head><meta charset='UTF - 8'><title>Redirect...</title><script>function Get_Path_For_IP(){var my_current_url = window.location.href;var words = my_current_url.split(':');var words_final = words[1].split('/');var final_ip = 'http://' + words_final[2] + ':8080';return final_ip;}; console.log(Get_Path_For_IP()); location.href = Get_Path_For_IP()</script></head><body></body></html>";
            return page;
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

        public static string Css_Registration(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\css\\registration.css";
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

        public static string Js_Widgets(HttpListenerRequest request)
        {
            var projectPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
            string filePath = Path.Combine(Path.GetFullPath(@"..\..\"), "Resources");
            filePath += "\\static\\js\\widgets.js";
            string login_page = File.ReadAllText(filePath);
            return (login_page);
        }
    }
}
