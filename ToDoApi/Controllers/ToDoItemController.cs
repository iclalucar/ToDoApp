using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ToDoApi.DbContexts;
using ToDoApi.Models;


namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class ToDoItemsController : ControllerBase
    {
        private readonly ToDoDbContext _context;

        public ToDoItemsController(ToDoDbContext context)
        {
            _context = context;
        }

        //tum listeyi getiren endpoint
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetTodoItems()
        {
            var userId = await GetUserId();

            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            return await _context.ToDoItems.Where(x => x.UserId == userId).ToListAsync();
        }

        //secileni getirir
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItem>> GetTodoItem(long id)
        {
            var userId = await GetUserId();

            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var todoItem = await _context.ToDoItems.Where(x => x.Id == id && x.UserId == userId).FirstOrDefaultAsync();
            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        //secileni gunceller
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, ToDoItem item)
        {
            if (id != item?.Id)
            {
                return BadRequest();
            }

            var userId = await GetUserId();

            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var todoItem = await _context.ToDoItems.Where(x => x.Id == id && x.UserId == userId).FirstOrDefaultAsync();
            if (todoItem == null)
            {
                return NotFound();
            }

            todoItem.Name = item.Name;
            todoItem.IsComplete = item.IsComplete;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!TodoItemExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        //yeni ekleme
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> PostTodoItem(ToDoItem item)
        {
            var userId = await GetUserId();

            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var todoItem = new ToDoItem
            {
                IsComplete = item.IsComplete,
                Name = item.Name,
                UserId = userId
            };

            _context.ToDoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTodoItem),
                new { id = todoItem.Id },
                todoItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var userId = await GetUserId();

            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var todoItem = await _context.ToDoItems.Where(x => x.Id == id && x.UserId == userId).FirstOrDefaultAsync();
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        //var mi yok mu kont eder
        private bool TodoItemExists(long id)
        {
            return _context.ToDoItems.Any(e => e.Id == id);
        }

        // Kullanıcı ID'sini çıkaran yardımcı metot
        private async Task<string> GetUserId()
        {
            var token = await HttpContext.GetTokenAsync("access_token");
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("qweASDzxcqweASDzxcqweASDzxcqweASDzxcqweASDzxc");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                RequireExpirationTime = false,
                ClockSkew = TimeSpan.Zero
            };

            try
            {
                jwtTokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                    return jwtSecurityToken.Claims.First(c => c.Type == "Id").Value;
            }
            catch { }
            return string.Empty;
        }

    }

}