import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from b2_builder_tool import check_list
from b2_topics_part2 import B2_PART_2_RAW
from b2_part2_supplement import B2_PART2_SUPPLEMENT
from b2_part2_deficit import B2_PART2_DEFICIT

combined = B2_PART_2_RAW + B2_PART2_SUPPLEMENT + B2_PART2_DEFICIT
clean, col = check_list(combined, 'Part 2 All')
