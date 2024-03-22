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
    public static Action UPLOAD_FILE = new Action(6, "Upload File");
    public static Action EXPORT = new Action(7, "Export");
    public static List<Action> ActionEnumList = new List<Action>
    {
        CREATE, UPDATE, DELETE, READ,
        APPROVAL, UPLOAD_FILE, EXPORT
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
