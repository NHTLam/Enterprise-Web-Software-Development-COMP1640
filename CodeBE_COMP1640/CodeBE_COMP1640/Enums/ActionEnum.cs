using CodeBE_COMP1640.Models;
using System;
using System.Collections.Generic;

namespace CodeBE_COMP1640.Enums;

public partial class ActionEnum
{
    public static Action CREATE_ACCOUNT = new Action(1, "Create Account");
    public static Action UPDATE_ACCOUNT = new Action(2, "Update Account");
    public static Action DELETE_ACCOUNT = new Action(3, "Delete Account");
    public static Action READ_ACCOUNT = new Action(4, "Read Account");
    public static Action CREATE_ROLE = new Action(5, "Create Role");
    public static Action UPDATE_ROLE = new Action(6, "Update Role");
    public static Action DELETE_ROLE = new Action(7, "Delete Role");
    public static Action READ_ROLE = new Action(8, "Read Role");
    public static Action APPROVAL = new Action(9, "Approval");
    public static List<Action> ActionEnumList = new List<Action>
    {
        CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT, READ_ACCOUNT,
        CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE, READ_ROLE,
        APPROVAL
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
