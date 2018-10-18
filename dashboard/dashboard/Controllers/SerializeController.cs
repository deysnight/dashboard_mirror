using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace dashboard.Controllers
{
    [Route("internal")]
    public class InternalController : ControllerBase
    {
        [HttpGet("login/{id}")]
        public ActionResult<string> Login(string id)
        {
            //127.0.0.1:8080/internal/login/machin:truc
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\internal");
            path += "\\users.json";
            List<Users> all_users = new List<Users>(); // list a recup de fichier json deja existant 

            if (System.IO.File.Exists(path))
            {
                string temp = System.IO.File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject<List<Users>>(temp);
            }

            string[] words = id.Split(':');
            words[1] = Program.HashPass(words[1]);

            foreach (Users u in all_users)
            {
                if (u.login == words[0] && u.password == words[1])
                {
                    return ("OK LOGIN");
                }
                else if (u.login == words[0] && u.password != words[1])
                {
                    return ("KO PASS");
                }
            }
            return ("KO LOGIN");
        }

        [HttpGet("signup/{id}")]
        public ActionResult<string> Signup(string id)
        {
            //127.0.0.1:8080/internal/Signup/machin:truc:chose

            string path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\internal");
            path += "\\users.json";
            List<Users> all_users = new List<Users>();// list a recup de fichier json deja existant 

            if (System.IO.File.Exists(path))
            {
                string temp = System.IO.File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject<List<Users>>(temp);
            }
            string[] words = id.Split(':');
            //parcour voir si user exist pas deja
            foreach (Users u in all_users)
            {
                if (u.login == words[0])
                {
                    return ("KO LOGIN");
                }
                else if (Program.HashPass(u.mail) == words[1])
                {
                    return ("KO MAIL");
                }
            }

            Users user = new Users();
            user.login = words[0];
            user.mail = Program.HashPass(words[1]);
            user.password = Program.HashPass(words[2]);
            dynamic test = JsonConvert.DeserializeObject("{\"ss\": {\"s01\": false,\"s02\": false,\"s03\": false,\"s04\": false,\"s05\": false,\"s06\": false}}");
            user.config = test;
            Console.Write(test);
            all_users.Add(user);
            string output = JsonConvert.SerializeObject(all_users);
            TextWriter tw = new StreamWriter(path);
            tw.WriteLine(output);
            tw.Close();
            return ("OK USER REGISTER");
        }

        [HttpGet("get_user_config/{id}")]
        public ActionResult<string> Get_User_Config(string id)
        {
            //127.0.0.1:8080/internal/get_user_config/machin

            dynamic response = JsonConvert.DeserializeObject("{\"exist\": false}");
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\internal");
            path += "\\users.json";
            dynamic all_users;
            if (System.IO.File.Exists(path))
            {
                string temp = System.IO.File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject(temp);
            }
            else
                return (JsonConvert.SerializeObject(response));
            foreach (dynamic user in all_users)
            {
                if (user.login == id)
                {
                    response.exist = true;
                    response.config = user.config;
                    break;
                }
            }
            return JsonConvert.SerializeObject(response);
        }

        [HttpGet("set_user_config/{id}")]
        public ActionResult<string> Set_User_Config(string id)
        {
            //127.0.0.1:8080/internal/set_user_config/machin

            dynamic response = JsonConvert.DeserializeObject("{\"success\": false}");
            string path = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\internal");
            path += "\\users.json";
            string[] user_data = id.Split('$');

            dynamic all_users;
            if (System.IO.File.Exists(path))
            {
                string temp = System.IO.File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject(temp);
            }
            else
                return (JsonConvert.SerializeObject(response));
            foreach (dynamic user in all_users)
            {
                if (user.login == user_data[0])
                {
                    response.success = true;
                    user.config = user_data[1];
                    break;
                }
            }
            string output = JsonConvert.SerializeObject(all_users);
            TextWriter tw = new StreamWriter(path);
            tw.WriteLine(output);
            tw.Close();
            return JsonConvert.SerializeObject(response);
        }
    }
}