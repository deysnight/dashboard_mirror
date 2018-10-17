using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebServer
{
    public class Users
    {
        public string login { get; set; }
        public string mail { get; set; }
        public string password { get; set; }
        public dynamic config { get; set; }
    }

    class Serialize_data
    {
        static string HashPass(string password)
        {
            SHA256 sha = new SHA256CryptoServiceProvider();

            //compute hash from the bytes of text
            sha.ComputeHash(ASCIIEncoding.ASCII.GetBytes(password));

            //get hash result after compute it
            byte[] result = sha.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits
                //for each byte
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }

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

            s = s.Replace("data=", "");
            s = s.Replace("%3A", ":");

            string[] words = s.Split(':');

            words[1] = HashPass(words[1]);

            //parcour voir si user exist 
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
            user.password = HashPass(words[2]);
            dynamic test = JsonConvert.DeserializeObject("{\"ss\": {\"s01\": false,\"s02\": false,\"s03\": false,\"s04\": false,\"s05\": false}}");
            user.config = test;
            Console.Write(test);
            all_users.Add(user);
            string output = JsonConvert.SerializeObject(all_users);
            TextWriter tw = new StreamWriter(path);
            tw.WriteLine(output);
            tw.Close();

            return ("OK USER REGISTER");
        }

        public static string Get_User_Config(HttpListenerRequest request)
        {
            Stream body = request.InputStream;
            Encoding encoding = request.ContentEncoding;
            StreamReader reader = new StreamReader(body, encoding);
            string temp_user = reader.ReadToEnd();

            dynamic response = JsonConvert.DeserializeObject("{\"exist\": false}");
            string path = Directory.GetCurrentDirectory() + "\\users.json";
            dynamic all_users;
            if (File.Exists(path))
            {
                string temp = File.ReadAllText(path);
                all_users = JsonConvert.DeserializeObject(temp);
            }
            else
                return (JsonConvert.SerializeObject(response));
            foreach (dynamic user in all_users)
            {
                if (user.login == temp_user)
                {
                    response.exist = true;
                    response.config = user.config;
                    break;
                }
            }
            return JsonConvert.SerializeObject(response);
        }

        public static string Set_User_Config(HttpListenerRequest request)
        {
            Stream body = request.InputStream;
            Encoding encoding = request.ContentEncoding;
            StreamReader reader = new StreamReader(body, encoding);
            string[] user_data = reader.ReadToEnd().Split('$');

            dynamic response = JsonConvert.DeserializeObject("{\"success\": false}");
            string path = Directory.GetCurrentDirectory() + "\\users.json";
            dynamic all_users;
            if (File.Exists(path))
            {
                string temp = File.ReadAllText(path);
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
