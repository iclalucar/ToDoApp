using System;
namespace ToDoApi.Models
{
	public class ToDoItem
	{
		public ToDoItem() {}

        public long Id { get; set; }

        public string? Name { get; set; }

        public bool IsComplete { get; set; }

        public string? UserId { get; internal set;}
    }
}

