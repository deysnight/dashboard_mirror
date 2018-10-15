using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace WebServer
{
    class Widgets
    {
        public static string meteo_api = "https://api.apixu.com/v1/current.json?key=a938d217462b43e5a91150242180110&q={0}";
        public static string crypto_api = "https://min-api.cryptocompare.com/data/price?fsym={0}&tsyms={1}";
        public static string ytb_getid_api = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&fields=items%2Fsnippet%2FchannelId&q={0}&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0";
        public static string ytb_getstats_api = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id={0}&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0";
        public static string ytb_getpic_api = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id={0}&fields=items%2Fsnippet%2Fthumbnails&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0";
        public static string ytb_getvod_api = "https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0&part=snippet&q={0}";
        public static string ytb_getview_api = "https://www.googleapis.com/youtube/v3/videos?part=statistics&id={0}&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0";
        public static string ytb_getcom_api = "https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0&textFormat=plainText&part=snippet&videoId={0}&maxResults={1}";
        public static string twitch_streamer_api = "https://api.twitch.tv/kraken/streams/{0}";
        public static string twitch_game_api = "https://api.twitch.tv/kraken/streams/summary?game={0}";
        public static string steam_gamename_api = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
        public static string steam_countplayer_api = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid={0}";
        public static string steam_userid_api = "https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=CFA1A0B5703346E31EAF12DD8BEEE247&steamid={0}";
        public static string steam_username_api ="https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=CFA1A0B5703346E31EAF12DD8BEEE247&steamids={0}";



        public static async Task<string> MeteoAsync(HttpListenerRequest request)
        {
            //http://10.18.207.77:8080/API/meteo/town=nancy
            string[] tmp = request.RawUrl.Split('=');
            string query = string.Format(meteo_api, tmp[1]);
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            return (result);
        }

        public static async Task<string> CryptoAsync(HttpListenerRequest request)
        {
            //http://10.18.207.77:8080/API/crypto&Cfrom=BTC&Cto=EUR
            string[] tmp = request.RawUrl.Split("&=".ToCharArray());
            string query = string.Format(crypto_api, tmp[2], tmp[4]);
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            return (result);
        }

        public static async Task<string> YTB_statsAsync(HttpListenerRequest request)
        {
            //http://10.18.207.77:8080/API/YTB/channel=ZyonREZ
            string[] tmp = request.RawUrl.Split('=');
            string query = string.Format(ytb_getid_api, tmp[1]);

            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            string chan_id = json.items[0].snippet.channelId;

            query = string.Format(ytb_getstats_api, chan_id);
            uri = new Uri(query);
            result = await hc.GetStringAsync(uri);
            json = JsonConvert.DeserializeObject(result);

            dynamic response = json.items[0].statistics;

            query = string.Format(ytb_getpic_api, chan_id);
            uri = new Uri(query);
            result = await hc.GetStringAsync(uri);
            json = JsonConvert.DeserializeObject(result);

            response.url = json.items[0].snippet.thumbnails.medium.url;
            return (JsonConvert.SerializeObject(response));
        }

        public static async Task<string> YTB_vodAsync(HttpListenerRequest request)
        {
            //http://10.18.207.77:8080/API/YTB/vod=https://www.youtube.com/watch?v=20_KIKlYdEo
            string[] tmp = request.RawUrl.Split('=');
            string query = string.Format(ytb_getvod_api, tmp[2]);

            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);

            dynamic response = JsonConvert.DeserializeObject("{" + "\"videoID\"" + ": \"" + json.items[0].id.videoId + "\"}");
            response.title = json.items[0].snippet.title;
            response.description = json.items[0].snippet.description;
            response.url = json.items[0].snippet.thumbnails.high.url;

            query = string.Format(ytb_getview_api, response.videoID);
            uri = new Uri(query);
            result = await hc.GetStringAsync(uri);
            json = JsonConvert.DeserializeObject(result);

            response.viewCount = json.items[0].statistics.viewCount;
            response.likeCount = json.items[0].statistics.likeCount;
            response.dislikeCount = json.items[0].statistics.dislikeCount;
            response.commentCount = json.items[0].statistics.commentCount;
            return (JsonConvert.SerializeObject(response));
        }

        public static async Task<string> YTB_commentAsync(HttpListenerRequest request)
        {
            //http://10.18.207.77:8080/API/YTB/max=10&vod=https://www.youtube.com/watch?v=20_KIKlYdEo
            string[] tmp = request.RawUrl.Split(new Char[] { '=', '&'});
            string query = string.Format(ytb_getcom_api, tmp[4], tmp[1]);

            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            dynamic response = JsonConvert.DeserializeObject("{" + "\"videoID\"" + ": \"" + tmp[4] + "\", \"comments\" : []}");
            foreach (dynamic element in json.items)
            {
                dynamic new_com = new JObject();
                new_com.authorDisplayName = element.snippet.topLevelComment.snippet.authorDisplayName;
                new_com.authorProfileImageUrl = element.snippet.topLevelComment.snippet.authorProfileImageUrl;
                new_com.textDisplay = element.snippet.topLevelComment.snippet.textDisplay;
                JArray item = (JArray)response.comments;
                item.Add(new_com);
            }            
            return (JsonConvert.SerializeObject(response));
        }

        public static async Task<string> twitch_streamerAsync(HttpListenerRequest request)
        {
            //http://10.18.207.243:8080/API/twitch/streamer=ogamingsc2
            string[] tmp = request.RawUrl.Split('=');
            string query = string.Format(twitch_streamer_api, tmp[1]);
            var uri = new Uri(query);
            var hc = new HttpClient();
            hc.DefaultRequestHeaders.Add("Client-ID", "ramymwgh8lh9az7bnjspgybbmounlo");
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);

            if (json.stream.Type == Newtonsoft.Json.Linq.JTokenType.Null)
            {
                return ("{\"onStream\": false}");
            }
            dynamic response = JsonConvert.DeserializeObject("{\"onStream\": true}");
            response.stream_type = json.stream.stream_type;
            response.viewers = json.stream.viewers;
            response.game = json.stream.game;
            response.pic = json.stream.preview.large;
            response.nsfw = json.stream.channel.mature;
            response.status = json.stream.channel.status;
            response.url = json.stream.channel.url;
            response.views = json.stream.channel.views;
            response.followers = json.stream.channel.followers;
            return (JsonConvert.SerializeObject(response));
        }

        public static async Task<string> twitch_gameAsync(HttpListenerRequest request)
        {
            //http://10.18.207.243:8080/API/twitch/game=Path%20Of%20Exile
            string[] tmp = request.RawUrl.Split('=');
            string query = string.Format(twitch_game_api, tmp[1]);
            var uri = new Uri(query);
            var hc = new HttpClient();
            hc.DefaultRequestHeaders.Add("Client-ID", "ramymwgh8lh9az7bnjspgybbmounlo");
            var result = await hc.GetStringAsync(uri);
            return (result);
        }

        public static async Task<string> steam_gameAsync(HttpListenerRequest request)
        {
            //http://10.18.207.243:8080/API/steam/game=730            
            string[] tmp = request.RawUrl.Split('=');
            string query = steam_gamename_api;
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            json = json.applist.apps;
            dynamic response = JsonConvert.DeserializeObject("{\"appExist\": false}");
            foreach (dynamic element in json)
            {
                if (element.appid == tmp[1])
                {
                    response.appExist = true;
                    response.name = element.name;
                    response.id = tmp[1];
                    break;
                }
            }
            if (response.appExist == true)
            {
                query = string.Format(steam_countplayer_api, tmp[1]);
                uri = new Uri(query);
                result = await hc.GetStringAsync(uri);
                json = JsonConvert.DeserializeObject(result);
                response.player = json.response.player_count;
            }
            return (JsonConvert.SerializeObject(response));
        }

        public static async Task<string> steam_friendAsync(HttpListenerRequest request)
        {
            //http://10.18.207.243:8080/API/steam/user=76561198033121295           
            string[] tmp = request.RawUrl.Split('=');
            string query = string.Format(steam_userid_api, tmp[1]);
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            json = json.friendslist.friends;
            dynamic response = JsonConvert.DeserializeObject("{\"countfriend\":" + json.Count + "}");
            List<string> friend = new List<string>();
            foreach (dynamic element in json)
            {
                query = string.Format(steam_username_api, element.steamid);
                uri = new Uri(query);
                result = await hc.GetStringAsync(uri);
                dynamic temp = JsonConvert.DeserializeObject(result);
                friend.Add(temp.response.players[0].personaname.ToString());
            }
            response.friends = JsonConvert.DeserializeObject(JsonConvert.SerializeObject(friend));
            return (JsonConvert.SerializeObject(response));
        }
    }
}
