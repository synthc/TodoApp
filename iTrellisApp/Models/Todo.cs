using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTrellisApp.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool Completed { get; set; }
        public string Details { get; set; }
        public DateTime DateCreated { get; set; }
    }
}