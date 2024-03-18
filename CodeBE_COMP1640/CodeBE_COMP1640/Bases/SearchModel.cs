namespace CodeBE_COMP1640.Bases
{
    public abstract class SearchModel<T>
    {
        public int? SearchId { get; set; }
        public List<T>? List { get; set; }
    }
}
