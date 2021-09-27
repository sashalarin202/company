using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;

namespace WebApplication1.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            string query = @" 
                select Id,Name,DepartmentId,
                CAST( DateOfJoining  AS DATETIME) as DateOfJoining,
                PhotoFilename
                from
                dbo.Employee
                ";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        public string Post(Employee emp)
        {
            try
            {
                string query = @"
                    insert into dbo.Employee ( Name, DepartmentId )values
                    (
                    '" + emp.Name + @"'
                    ,'" + emp.DepartmentId + @"'
                    )
                    ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succesfully!!";
            }
            catch (Exception ex)
            {
                return $"Added Faild {ex}";
            }
        }
        public IHttpActionResult Put(Employee emp)
        {
            try
            {
                string query = @"
                    update dbo.Employee set
                    Name='" + emp.Name + @"'
                    ,DepartmentId='" + emp.DepartmentId + @"'
                    where Id=" + emp.Id + @"
                    ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return Ok("Update Succesfully!!");
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        public string Delete(int id)
        {
            try
            {
                string query = @"
                    delete from dbo.Employee 
                    where Id=" + id + @"
                    ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Delete Succesfully!!";
            }
            catch (Exception ex)
            {
                
                return $"Faild to Delete!! {ex}";
                
            }
        }
        [Route("api/Employee/GetAllDepartmentNames")]
        [HttpGet]
        public HttpResponseMessage GetAllDepartmentNames()
        {
            string query = @"
                    select DepartmentName from dbo.Department";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
        [Route("api/Employees/SaveFile")]
        public string SaveFile()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);

                postedFile.SaveAs(physicalPath);

                return filename;
            }
            catch(Exception ex)
            {
                return $"anonymous.png {ex}";
            }
        }



    }
}
