using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ditme.Models;
public class ApplicationDbContext : IdentityDbContext
{
    public
    ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
    {
    }

}