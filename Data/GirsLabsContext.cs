using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GirsLabs.Models;

namespace GirsLabs.Data
{
    public class GirsLabsContext : DbContext
    {
        public GirsLabsContext (DbContextOptions<GirsLabsContext> options)
            : base(options)
        {
        }

        public DbSet<GirsLabs.Models.Deal> Deal { get; set; } = default!;
    }
}
