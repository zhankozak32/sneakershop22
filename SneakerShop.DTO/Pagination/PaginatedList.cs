using System.Collections.Generic;

namespace SneakerShop.DTO.Pagination
{
    public class PaginatedList<T>
    {
        public IEnumerable<T> Data { get; set; }
        public PageViewModel PageViewModel { get; set; }
    }
}