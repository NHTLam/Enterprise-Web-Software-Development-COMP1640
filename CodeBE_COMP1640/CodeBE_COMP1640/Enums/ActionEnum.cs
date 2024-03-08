using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Enums;

public partial class ActionEnum
{
    public static Action CREATE = new Action(1, "Create");
    public static Action UPDATE = new Action(2, "Update");
    public static Action DELETE = new Action(3, "Delete");
    public static Action READ = new Action(4, "Read");
    public static Action APPROVAL = new Action(5, "Approval");
    public static List<Action> ActionEnumList = new List<Action>
    {
        CREATE, UPDATE, DELETE, READ, APPROVAL
    };
}

public class Action
{
    public int Id { get; set; }
    public string Name { get; set; }
    public Action() { }
    public Action(int id, string name) 
    {
        this.Id = id;
        this.Name = name;
    }
}
