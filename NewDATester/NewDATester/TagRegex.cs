using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;



namespace PLCComDA
{
    public class TagRegex
    {
        // class data
        private Regex tagPattern;



        // class constructor
        public TagRegex()
        {
            tagPattern = new Regex(@"(?<plcCode>([A-Z0-9]{3}))(?<dbNumber>([0-9]{3,4}))(?<dataType>([xbcwidlrs]{1}))(?<dbAddress>([0-9]{3,4}))(?<dbBit>((\.[0-7]){0,1}))(?<dbTagComment>([_*]*))");
        }



        // class methods
        public Match processTag(string tag)
        {
            Match tagMatches = null;

            try
            {
                // trim the current line
                tag = tag.Trim();

                // analize the current logic entry, try to match with the logic pattern and, if correct, compute all the matches on the current line
                tagMatches = tagPattern.Match(tag);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return tagMatches;
        }
    }
}
