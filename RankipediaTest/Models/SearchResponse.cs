using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RankipediaTest.Models
{
    public class Industries
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long Value { get; set; }
        public bool IsSubCategory { get; set; }
        public List<Industries> SubCatergoryList { get; set; }
    }
}
