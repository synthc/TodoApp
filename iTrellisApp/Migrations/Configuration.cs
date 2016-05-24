namespace iTrellisApp.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<iTrellisApp.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(iTrellisApp.Models.ApplicationDbContext context)
        {
            Todo[] todos = new Todo[]
            {
                new Todo {Title = "Seeded task 1", DateCreated = DateTime.Now, Deadline = new DateTime(2016, 5, 23), Completed = false, Details = "details1" },
                new Todo {Title = "Seeded task 2", DateCreated = DateTime.Now, Deadline = new DateTime(2016, 4, 27), Completed = true, Details = "details2" },
                new Todo {Title = "Seeded task 3", DateCreated = DateTime.Now, Deadline = new DateTime(2016, 9, 14), Completed = false, Details = "details3" }
            };

            context.Todos.AddOrUpdate(t => t.Title, todos);
        }
    }
}
