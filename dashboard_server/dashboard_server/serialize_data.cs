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
    public class Users
    {
        public string login { get; set; }
        public string mail { get; set; }
        public string password { get; set; }
        public string ID { get; set; }
    }

    class Serialize_data
    {

        


        public static string Process_login(HttpListenerRequest request)
        {
           
            return ("bite");
        }

        public static string Process_signup(HttpListenerRequest request)
        {
            List<Users> all_users = new List<Users>(); // list a recup de fichier json deja existant

            Stream body = request.InputStream;
            Encoding encoding = request.ContentEncoding;
            StreamReader reader = new StreamReader(body, encoding);
            string s = reader.ReadToEnd();
            body.Close();
            reader.Close();
            s = s.Replace("%3A", ":");
            s = s.Replace("%40", "@");

            string[] words = s.Split(':');

            Users user = new Users();
            user.login = words[0];
            user.mail = words[1];
            user.password = words[2];
            user.ID = "0";

            all_users.Add(user);

            string output = JsonConvert.SerializeObject(all_users);

            string path = Directory.GetCurrentDirectory() + "\\users.json";
            TextWriter tw = new StreamWriter(path, true);
            tw.WriteLine("The next line!");
            tw.Close();

            return (output);
        }
    }
}
