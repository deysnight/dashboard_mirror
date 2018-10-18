using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace dashboard
{
    public class Users
    {
        public string login { get; set; }
        public string mail { get; set; }
        public string password { get; set; }
        public dynamic config { get; set; }
    }

    public class Program
    {
        public static string HashPass(string password)
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


        public static ContentResult Retrive_file(string file, string type, string folder)
        {
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\" + folder);
            filePath += "\\" + file;
            FileStream fileStream = new FileStream(filePath, FileMode.Open);
            using (StreamReader reader = new StreamReader(fileStream))
            {
                string line = reader.ReadToEnd();
                return new ContentResult
                {
                    ContentType = type,
                    StatusCode = (int)HttpStatusCode.OK,
                    Content = line
                };
            }
        }

        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
