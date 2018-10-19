using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeteoController : ControllerBase
    {
        // GET api/meteo/{ville}
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> MeteoAsync(string id)
        {
            string result;
            try
            {
                string query = string.Format("https://api.apixu.com/v1/current.json?key=a938d217462b43e5a91150242180110&q={0}", id);
                var uri = new Uri(query);
                var hc = new HttpClient();
                result = await hc.GetStringAsync(uri);
            }
            catch (Exception e)
            {
                result = "KO";
            }
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = result
            };
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class CryptoController : ControllerBase
    {
        // GET api/crypto/Cfrom={money1}&Cto={money2}
        [HttpGet("{id}")]
        public async Task<ActionResult<string>> CryptoAsync(string id)
        {
            string[] tmp = id.Split("&=".ToCharArray());
            string query = string.Format("https://min-api.cryptocompare.com/data/price?fsym={0}&tsyms={1}", tmp[1], tmp[3]);
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = result
            };
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class YtbController : ControllerBase
    {
        // GET api/ytb/stat/{chaine ytb}
        [HttpGet("stat/{id}")]
        public async Task<ActionResult<string>> StatAsync(string id)
        {
            string query = string.Format("https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&fields=items%2Fsnippet%2FchannelId&q={0}&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0", id);

            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            string chan_id = json.items[0].snippet.channelId;

            query = string.Format("https://www.googleapis.com/youtube/v3/channels?part=statistics&id={0}&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0", chan_id);
            uri = new Uri(query);
            result = await hc.GetStringAsync(uri);
            json = JsonConvert.DeserializeObject(result);

            dynamic response = json.items[0].statistics;

            query = string.Format("https://www.googleapis.com/youtube/v3/channels?part=snippet&id={0}&fields=items%2Fsnippet%2Fthumbnails&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0", chan_id);
            uri = new Uri(query);
            result = await hc.GetStringAsync(uri);
            json = JsonConvert.DeserializeObject(result);

            response.url = json.items[0].snippet.thumbnails.medium.url;
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = JsonConvert.SerializeObject(response)
            };
        }

        // GET api/ytb/vod/{id vod ytb}
        [HttpGet("vod/{id}")]
        public async Task<ActionResult<string>> VodAsync(string id)
        {
            string query = string.Format("https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0&part=snippet&q={0}", id);

            try
            {
                var uri = new Uri(query);
                var hc = new HttpClient();
                var result = await hc.GetStringAsync(uri);
                dynamic json = JsonConvert.DeserializeObject(result);

                dynamic response = JsonConvert.DeserializeObject("{" + "\"videoID\"" + ": \"" + json.items[0].id.videoId + "\"}");
                response.title = json.items[0].snippet.title;
                response.description = json.items[0].snippet.description;
                response.url = json.items[0].snippet.thumbnails.high.url;

                query = string.Format("https://www.googleapis.com/youtube/v3/videos?part=statistics&id={0}&key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0", response.videoID);
                uri = new Uri(query);
                result = await hc.GetStringAsync(uri);
                json = JsonConvert.DeserializeObject(result);

                response.viewCount = json.items[0].statistics.viewCount;
                response.likeCount = json.items[0].statistics.likeCount;
                response.dislikeCount = json.items[0].statistics.dislikeCount;
                response.commentCount = json.items[0].statistics.commentCount;
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.OK,
                    Content = JsonConvert.SerializeObject(response)
                };
            }
            catch (Exception e)
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.OK,
                    Content = "KO"
                };
            }
        }

        // GET api/ytb/com/max={nb de com}&vod={id vod ytb}
        [HttpGet("com/{id}")]
        public async Task<ActionResult<string>> ComAsync(string id)
        {
            string[] tmp = id.Split(new Char[] { '=', '&' });
            string query = string.Format("https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyBdZCKH5Ol54YuvVU5WyyQY4Wi00mlY7y0&textFormat=plainText&part=snippet&videoId={0}&maxResults={1}", tmp[3], tmp[1]);

            try
            {
                var uri = new Uri(query);
                var hc = new HttpClient();
                var result = await hc.GetStringAsync(uri);
                dynamic json = JsonConvert.DeserializeObject(result);
                dynamic response = JsonConvert.DeserializeObject("{" + "\"videoID\"" + ": \"" + tmp[3] + "\", \"comments\" : []}");
                foreach (dynamic element in json.items)
                {
                    dynamic new_com = new JObject();
                    new_com.authorDisplayName = element.snippet.topLevelComment.snippet.authorDisplayName;
                    new_com.authorProfileImageUrl = element.snippet.topLevelComment.snippet.authorProfileImageUrl;
                    new_com.textDisplay = element.snippet.topLevelComment.snippet.textDisplay;
                    JArray item = (JArray)response.comments;
                    item.Add(new_com);
                }
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.OK,
                    Content = JsonConvert.SerializeObject(response)
                };
            }
            catch (Exception e)
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.OK,
                    Content = "KO"
                };
            }
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TwitchController : ControllerBase
    {
        // GET api/twitch/game/{game name}
        [HttpGet("game/{id}")]
        public async Task<ActionResult<string>> GameAsync(string id)
        {
            string query = string.Format("https://api.twitch.tv/kraken/streams/summary?game={0}", id);
            var uri = new Uri(query);
            var hc = new HttpClient();
            hc.DefaultRequestHeaders.Add("Client-ID", "ramymwgh8lh9az7bnjspgybbmounlo");
            var result = await hc.GetStringAsync(uri);
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = result
            };
        }

        // GET api/twitch/stream/{streamer name}
        [HttpGet("stream/{id}")]
        public async Task<ActionResult<string>> StreamAsync(string id)
        {
            string query = string.Format("https://api.twitch.tv/kraken/streams/{0}", id);
            var uri = new Uri(query);
            var hc = new HttpClient();
            hc.DefaultRequestHeaders.Add("Client-ID", "ramymwgh8lh9az7bnjspgybbmounlo");
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);

            if (json.stream.Type == JTokenType.Null)
            {
                return new ContentResult
                {
                    ContentType = "application/json",
                    StatusCode = (int)HttpStatusCode.OK,
                    Content = "{\"onStream\": false}"
                };
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
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = JsonConvert.SerializeObject(response)
            };
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class SteamController : ControllerBase
    {
        // GET api/steam/game/{game ID}
        [HttpGet("game/{id}")]
        public async Task<ActionResult<string>> GameAsync(string id)
        {
            string query = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            json = json.applist.apps;
            dynamic response = JsonConvert.DeserializeObject("{\"appExist\": false}");
            foreach (dynamic element in json)
            {
                if (element.appid == id)
                {
                    response.appExist = true;
                    response.name = element.name;
                    response.id = id;
                    break;
                }
            }
            if (response.appExist == true)
            {
                query = string.Format("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid={0}", id);
                uri = new Uri(query);
                result = await hc.GetStringAsync(uri);
                json = JsonConvert.DeserializeObject(result);
                response.player = json.response.player_count;
            }
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = JsonConvert.SerializeObject(response)
            };
        }

        // GET api/steam/user/{user id}
        [HttpGet("user/{id}")]
        public async Task<ActionResult<string>> friendAsync(string id)
        {
            string query = string.Format("https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=CFA1A0B5703346E31EAF12DD8BEEE247&steamid={0}", id);
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            json = json.friendslist.friends;
            dynamic response = JsonConvert.DeserializeObject("{\"countfriend\":" + json.Count + "}");
            List<string> friend = new List<string>();
            foreach (dynamic element in json)
            {
                query = string.Format("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=CFA1A0B5703346E31EAF12DD8BEEE247&steamids={0}", element.steamid);
                uri = new Uri(query);
                result = await hc.GetStringAsync(uri);
                dynamic temp = JsonConvert.DeserializeObject(result);
                friend.Add(temp.response.players[0].personaname.ToString());
            }
            response.friends = JsonConvert.DeserializeObject(JsonConvert.SerializeObject(friend));
            return new ContentResult
            {
                ContentType = "application/json",
                StatusCode = (int)HttpStatusCode.OK,
                Content = JsonConvert.SerializeObject(response)
            };
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class OwController : ControllerBase
    {
        // GET api/ow/stat{btag}
        [HttpGet("stat/{id}")]
        public async Task<ActionResult<string>> OwAsync(string id)
        {
            string query = string.Format("https://ow-api.com/v1/stats/pc/eu/{0}/complete", id);
            var uri = new Uri(query);
            var hc = new HttpClient();
            var result = await hc.GetStringAsync(uri);
            dynamic json = JsonConvert.DeserializeObject(result);
            return (JsonConvert.SerializeObject(json));
        }
    }
}