using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.SessionState;

using LoginProject.Models;

namespace LoginProject.Controllers
{

    public class UsersController : ApiController
    {
      
        

        private LoginProjectContext db = new LoginProjectContext();

       /* public class BaseAPIController : ApiController
        {
          
        
            public BaseAPIController()
            {
                //GET Current Session.
                var session = System.Web.HttpContext.Current.Session;

                if (!(HttpContext.Current.User.Identity.IsAuthenticated))
                {
                    SetHeader();
                }
            }

            public void SetHeader()
            {
                HttpResponse resp = HttpContext.Current.Response;
                resp.StatusCode = 401;
                resp.End();
            }
        }
*/
        [Route("GetAllUser")]
        [HttpGet]
        [ResponseType(typeof(User))]

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
           
     

            if (HttpContext.Current.Session["userEmail"] != null)
            {
                return db.Users;
            }
            else

            return null;
        } 

        [Route("Logout")]
        [HttpGet]
        [ResponseType(typeof(User))]

        public string Logout()
        {
            //System.Web.HttpContext.Current.Session["userEmail"];
            System.Web.HttpContext.Current.Session["userEmail"] = null;
            //System.Web.HttpContext.Current.Session.Clear();
            return "logout";

        
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.userId)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

      /*  [Route("ResetPassword")]
        [HttpPut]
        [ResponseType(typeof(User))]
        public HttpResponseMessage UpdatePassword(string oldpassword,[FromBody]User user)
        {
            var obj = db.Users.FirstOrDefault(x => x.userPassword == oldpassword);

            if(obj == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "User with password"+"not found to update");
            }

            else {
                obj.userPassword = user.userPassword;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK,obj);
            }
            
        } */
        [Route("resetPassword")]
        [HttpPut]
        [ResponseType(typeof(User))]

        public HttpResponseMessage UpdatePassword([FromBody] User user)
        {
            var obj = db.Users.ToList();
            var userDetails=obj.Where(x => x.userPassword == user.userPassword && x.userEmail == user.userEmail).Single();
            if (obj == null)
            {

                return Request.CreateResponse(HttpStatusCode.NotFound, user);
            }
            else
            {
                var userData = db.Users.Where(x=>x.userId== userDetails.userId).First<User>();
                userData.userPassword = user.userNewPassword;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }

          
        }

        // POST: api/Users
        [ResponseType(typeof(User))] 
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.userId }, user);
        }

      

        [Route("login")]
        [HttpPost]
        [ResponseType(typeof(User))]
        public HttpResponseMessage PostLogin([FromBody] User user)
        {
           var Obj = db.Users.Where( x=> x.userEmail == user.userEmail && x.userPassword == user.userPassword).FirstOrDefault();
            

            if (Obj == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, user);
            }
            else {

                var k = System.Web.HttpContext.Current.Session["userEmail"];
                 SessionStateItemCollection Session = new SessionStateItemCollection();
                System.Web.HttpContext.Current.Session["userEmail"] = user.userEmail;
                //sessionstorage ["userName"] = user.userName;

                return Request.CreateResponse(HttpStatusCode.OK, user);

            }

        }






        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.userId == id) > 0;
        }

      
    }
}