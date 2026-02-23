namespace GirsLabs.Models
{
    public class Deal
    {
        public int Id { get; set; }

        public DealType Type { get; set; }
    }

    public enum DealType
    {
        Beauty,
        Fashion,
        Home,

    }
}
