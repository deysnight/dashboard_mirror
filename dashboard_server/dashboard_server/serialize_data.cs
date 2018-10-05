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

            string path = Directory.GetCurrentDirectory() + "\\users.json";
            List<Users> all_users = new List<Users>(); // list a recup de fichier json deja existant 
            if (File.Exists(path))
            {
                string temp = File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject<List<Users>>(temp);
            }

            Stream body = request.InputStream;
            Encoding encoding = request.ContentEncoding;
            StreamReader reader = new StreamReader(body, encoding);
            string s = reader.ReadToEnd();
            body.Close();
            reader.Close();

            Console.WriteLine(s);

            s = s.Replace("data=", "");
            s = s.Replace("%3A", ":");

            string[] words = s.Split(':');

            //parcour voir si user exist 
            foreach (Users u in all_users)
            {
                if (u.login == words[0] && u.password == words[1])
                {
                    Console.WriteLine("OK LOGIN");
                    return ("OK LOGIN");
                }
                else if (u.login == words[0] && u.password != words[1])
                {
                    Console.WriteLine("KO PASS");
                    return ("KO PASS");
                }
            }
            Console.WriteLine("KO LOGIN");
            return ("KO LOGIN");
        }

        public static string Process_signup(HttpListenerRequest request)
        {
            string path = Directory.GetCurrentDirectory() + "\\users.json";
            List<Users> all_users = new List<Users>(); // list a recup de fichier json deja existant 
            if (File.Exists(path))
            {
                string temp = File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject<List<Users>>(temp);
            }

            Stream body = request.InputStream;
            Encoding encoding = request.ContentEncoding;
            StreamReader reader = new StreamReader(body, encoding);
            string s = reader.ReadToEnd();
            body.Close();
            reader.Close();
            s = s.Replace("data=", "");
            s = s.Replace("%3A", ":");
            s = s.Replace("%40", "@");

            string[] words = s.Split(':');

            //parcour voir si user exist pas deja 
            foreach (Users u in all_users)
            {
                if (u.login == words[0])
                {
                    return ("KO LOGIN");
                }
                else if (u.mail == words[1])
                {
                    return ("KO MAIL");
                }
            }

            Users user = new Users();
            user.login = words[0];
            user.mail = words[1];
            user.password = words[2];
            user.ID = "0";

            all_users.Add(user);

            string output = JsonConvert.SerializeObject(all_users);
            TextWriter tw = new StreamWriter(path);
            tw.WriteLine(output);
            tw.Close();

            return ("OK USER REGISTER");
        }
    }
}
