using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace dashboard.Controllers
{
    public class HomeController : ControllerBase
    {
        [Route("")]
        [Route("home")]
        [Route("home/dashboard")]
        [HttpGet]
        public ActionResult<string> Dashboard()
        {
            return Program.Retrive_file("dashboard.html", "text/html", "html");
        }

        [HttpGet]
        public ActionResult<string> Login()
        {
            return Program.Retrive_file("login.html", "text/html", "html");
        }

        [HttpGet]
        public ActionResult<string> Signup()
        {
            return Program.Retrive_file("signup.html", "text/html", "html");
        }

        [Route("error/404")]
        [HttpGet]
        public ActionResult<string> Notfound()
        {
            return Program.Retrive_file("notfound.html", "text/html", "html");
        }

        [Route("about.json")]
        [HttpGet]
        public ActionResult<string> About()
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\internal");
            filePath += "\\about.json";
            dynamic about = JsonConvert.DeserializeObject(System.IO.File.ReadAllText(filePath));

            var remoteIpAddress = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress.ToString();
            about.client.host = remoteIpAddress;

            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            int secondsSinceEpoch = (int)t.TotalSeconds;
            about.server.current_time = secondsSinceEpoch;
            return JsonConvert.SerializeObject(about);
        }
    }

    public class CssController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Notfound()
        {
            return Program.Retrive_file("notfound.css", "text/css", "css");
        }

        [HttpGet]
        public ActionResult<string> Dashboard()
        {
            return Program.Retrive_file("dashboard.css", "text/css", "css");
        }

        [HttpGet]
        public ActionResult<string> Header()
        {
            return Program.Retrive_file("header.css", "text/css", "css");
        }

        [HttpGet]
        public ActionResult<string> Registration()
        {
            return Program.Retrive_file("registration.css", "text/css", "css");
        }

        [HttpGet]
        public ActionResult<string> Base()
        {
            return Program.Retrive_file("base.css", "text/css", "css");
        }
    }

    public class JsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> Dashboard()
        {
            return Program.Retrive_file("dashboard.js", "application/javascript", "js");
        }

        [HttpGet]
        public ActionResult<string> Login()
        {
            return Program.Retrive_file("login.js", "application/javascript", "js");
        }

        [HttpGet]
        public ActionResult<string> Service()
        {
            return Program.Retrive_file("service.js", "application/javascript", "js");
        }

        [HttpGet]
        public ActionResult<string> Signup()
        {
            return Program.Retrive_file("signup.js", "application/javascript", "js");
        }

        [HttpGet]
        public ActionResult<string> Widgets()
        {
            return Program.Retrive_file("widgets.js", "application/javascript", "js");
        }
    }
}
