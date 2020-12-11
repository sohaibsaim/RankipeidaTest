using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using RankipediaTest.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RankipediaTest.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        // SUB CATEGORY LISTS
        
        private List<Industries> SubHealthcareList;
        private List<Industries> SubDentistryList;
        private List<Industries> SubVeterinaryList;

        // MAIN LIST
        private List<Industries> IndustriesList;
        private List<Industries> MainIndustriesList;
        

        public SearchController()
        {
            // LIST INITILIZATION

            // SUB CATEGORIES LIST
            SubDentistryList = new List<Industries>(){
            new Industries
            {
                Id = 1,
                Name = "Cosmetic Dentistry",
                Value = 1,
                IsSubCategory = true,
                SubCatergoryList = new List<Industries>(){
                new Industries
                {
                    Id = 1,
                    Name = "Cosmetic Dentistry Suggestion 1",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 2,
                    Name = "Cosmetic Dentistry Suggestion 2",
                    Value = 2,
                    IsSubCategory = true,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 3,
                    Name = "Cosmetic Dentistry Suggestion 3",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 4,
                    Name = "Cosmetic Dentistry Suggestion 4",
                    Value = 4,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 5,
                    Name = "Cosmetic Dentistry Suggestion 5",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }
                }
            }, new Industries
            {
                Id = 2,
                Name = "Endodontics",
                Value = 2,
                IsSubCategory = true,
                SubCatergoryList = new List<Industries>(){
                new Industries
                {
                    Id = 1,
                    Name = "Endodontics Suggestion 1",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 2,
                    Name = "Endodontics Suggestion 2",
                    Value = 2,
                    IsSubCategory = true,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 3,
                    Name = "Endodontics Suggestion 3",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 4,
                    Name = "Endodontics Suggestion 4",
                    Value = 4,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 5,
                    Name = "Endodontics Suggestion 5",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }
                }
            }, new Industries
            {
                Id = 3,
                Name = "Implant Dentistry",
                Value = 3,
                IsSubCategory = true,
                SubCatergoryList = new List<Industries>(){
                new Industries
                {
                    Id = 1,
                    Name = "Implant Dentistry Suggestion 1",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 2,
                    Name = "Implant Dentistry Suggestion 2",
                    Value = 2,
                    IsSubCategory = true,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 3,
                    Name = "Implant Dentistry Suggestion 3",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 4,
                    Name = "Implant Dentistry Suggestion 4",
                    Value = 4,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 5,
                    Name = "Implant Dentistry Suggestion 5",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }
                }
            }, new Industries
            {
                Id = 4,
                Name = "Neuromuscular Dentistry",
                Value = 4,
                IsSubCategory = true,
                SubCatergoryList = new List<Industries>(){
                new Industries
                {
                    Id = 1,
                    Name = "Neuromuscular Suggestion 1",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 2,
                    Name = "Neuromuscular Suggestion 2",
                    Value = 2,
                    IsSubCategory = true,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 3,
                    Name = "Neuromuscular Suggestion 3",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 4,
                    Name = "Neuromuscular Suggestion 4",
                    Value = 4,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 5,
                    Name = "Neuromuscular Suggestion 5",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }
                }
            }, new Industries
            {
                Id = 5,
                Name = "Orthodontics",
                Value = 5,
                IsSubCategory = true,
                SubCatergoryList = new List<Industries>(){
                new Industries
                {
                    Id = 1,
                    Name = "Orthodontics Suggestion 1",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 2,
                    Name = "Orthodontics Suggestion 2",
                    Value = 2,
                    IsSubCategory = true,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 3,
                    Name = "Orthodontics Suggestion 3",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 4,
                    Name = "Orthodontics Suggestion 4",
                    Value = 4,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }, new Industries
                {
                    Id = 5,
                    Name = "Orthodontics Suggestion 5",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                }
                }
            }
            };
            SubHealthcareList = new List<Industries>(){
            new Industries
            {
                Id = 1,
                Name = "Chiropractic",
                Value = 1,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 2,
                Name = "Dental Lab Technicians",
                Value = 2,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 3,
                Name = "Dentistry",
                Value = 3,
                IsSubCategory = true,
                SubCatergoryList = SubDentistryList
            }, new Industries
            {
                Id = 4,
                Name = "Dermatology",
                Value = 4,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 5,
                Name = "Plastic Surgery",
                Value = 5,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 6,
                Name = "Orthopedics",
                Value = 6,
                IsSubCategory = false,
                SubCatergoryList = null
            }
            };
            SubVeterinaryList = new List<Industries>(){
            new Industries
            {
                Id = 1,
                Name = "Animal Sciences",
                Value = 1,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 2,
                Name = "Pet Grooming",
                Value = 2,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 3,
                Name = "Veterinary Medicine",
                Value = 3,
                IsSubCategory = false,
                SubCatergoryList = null
            }, new Industries
            {
                Id = 4,
                Name = "Veterinarians",
                Value = 4,
                IsSubCategory = false,
                SubCatergoryList = null
            }
            };
            // MAIN INDUSTRY LIST
            IndustriesList = new List<Industries>() {
                new Industries
                {
                    Id = 1,
                    Name = "Automotive",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 2,
                    Name = "Education",
                    Value = 2,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 3,
                    Name = "Food & Beverage",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 4,
                    Name = "Healthcare",
                    Value = 4,
                    IsSubCategory = true,
                    SubCatergoryList = SubHealthcareList
                },
                new Industries
                {
                    Id = 5,
                    Name = "Automotive",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 6,
                    Name = "Home Care",
                    Value = 6,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 7,
                    Name = "Legal",
                    Value = 7,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 8,
                    Name = "Personal",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 9,
                    Name = "Veterinary",
                    Value = 9,
                    IsSubCategory = true,
                    SubCatergoryList = SubVeterinaryList
                }
            };

            MainIndustriesList = new List<Industries>() {
                new Industries
                {
                    Id = 1,
                    Name = "Automotive",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 2,
                    Name = "Education",
                    Value = 2,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 3,
                    Name = "Food & Beverage",
                    Value = 3,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 4,
                    Name = "Healthcare",
                    Value = 4,
                    IsSubCategory = true,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 5,
                    Name = "Automotive",
                    Value = 5,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 6,
                    Name = "Home Care",
                    Value = 6,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 7,
                    Name = "Legal",
                    Value = 7,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 8,
                    Name = "Personal",
                    Value = 1,
                    IsSubCategory = false,
                    SubCatergoryList = null
                },
                new Industries
                {
                    Id = 9,
                    Name = "Veterinary",
                    Value = 9,
                    IsSubCategory = true,
                    SubCatergoryList = null
                }
            };

        }
        [HttpGet]
        [Route("GetMainIndustriesList")]
        public IActionResult GetIndustriesList()
        {
            try
            {
                return Ok(MainIndustriesList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost]
        [Route("GetSubIndustryDetailsById")]
        public IActionResult GetIndustryById([FromBody] int IndustryId)
        {
            try
            {
                var Industry = IndustriesList.Where(x => x.Id == IndustryId).FirstOrDefault();
                return Ok(Industry.SubCatergoryList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
