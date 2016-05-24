using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTrellisApp.Models
{
    public class StatusVm
    {
        public int Id { get; set; }
        public bool OperationSucceeded { get; set; }
        public string Message { get; set; }
        public Todo Todo { get; set; }
    }
}