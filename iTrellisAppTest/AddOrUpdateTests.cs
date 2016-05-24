using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using iTrellisApp.Models;
using iTrellisApp.API;
using Generic_Repositories.Repositories;

namespace iTrellisAppTest
{
    [TestClass]
    public class AddOrUpdateTests
    {
        [TestMethod]
        public void TestFakeDate()
        {
            //Create test Todo and instantiate repository:
            Todo testTodo = new Todo
            {
                Title = "testTitle",
                Deadline = new DateTime(0001, 1, 1),
                Details = "testDetails",
                Completed = false,
                DateCreated = DateTime.Now,
            };

            TodoRepository repo = new TodoRepository();

            //Run method that replaces date:
            StatusVm result = repo.AddOrUpdateTodoTest(testTodo);

            //Verify that the resulting date is equal to the expected date:
            Assert.AreEqual(new DateTime(1753, 1, 1), result.Todo.Deadline);
        }

        //Fails because of required dependency injection:
        [TestMethod]
        public void TestNullInput()
        {
            //Create test Todo and instantiate repository:
            Todo testTodo = new Todo
            {
                Id = -1,
                Title = "testTitle",
                Deadline = new DateTime(0001, 1, 1),
                Details = "testDetails",
                Completed = false,
                DateCreated = DateTime.Now,
            };

            TodoRepository repo = new TodoRepository();

            //Run method that looks for Todo to update:
            StatusVm result = repo.AddOrUpdateTodoTest(testTodo);

            //Verify that the StatusVm reports an error:
            Assert.IsFalse(result.OperationSucceeded);
        }
    }
}