using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DepartmentId { get; set; }
        public string DateOfJoining { get; set; }
        public string PhotoFileName  { get; set; }
    }
}