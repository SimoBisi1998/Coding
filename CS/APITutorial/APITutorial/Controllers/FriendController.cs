using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APITutorial.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;


namespace APITutorial.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FriendController : ControllerBase
    {

        public List<Friend> friends = new List<Friend>() {
        new Friend(1,"Kindson", "Munonye", "Budapest", "2010-05-12"),
        new Friend(2,"Oleander", "Yuba", "Nigeria", "2012-05-12"),
        new Friend(3,"Saffron", "Lawrence", "Lagos", "2000-05-12"),
        new Friend(4,"Jadon", "Munonye", "Asaba", "2001-05-12"),
        new Friend(5,"Solace", "Okeke", "Oko", "2002-05-12")
        };

        //GET :api/Friend
        [HttpGet]
        public List<Friend> Get()
        {
            return friends;

        }

        //GET: api/Friend/5
        [HttpGet("{id}")]
        [Route("api/utente/{id}")]
        public Friend GetID(int id)
        {
            Friend friend = Get().Find(f => f.id == id);
            return friend;
        }

        //GET: api/Friend/firstname
        [HttpGet("{firstname}")]
        [Route("api/user/{firstname}")]
        public int GetLastname(string firstname)
        {
            foreach (Friend f in Get())
            {
                if (f.firstname.Equals(firstname))
                {
                    return f.id;
                }
            }
            return 0;
        }

        //POST friend/{json Friend}
        [HttpPost]
        [Route("api/friend")]
        public List<Friend> postFriend([FromBody] Friend friend)
        {
            
            friends.Add(friend);
            return friends;
        }

        [HttpGet]
        [Route("api/alluser")]
        public List<Friend> getAllUsers(List<Friend> friends)
        {
            return friends;
        }
    }
}