import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from b2_builder_tool import check_list
from b2_topics_part1 import B2_PART_1_RAW
from b2_part1_supplement import B2_PART1_SUPPLEMENT

combined = B2_PART_1_RAW + B2_PART1_SUPPLEMENT
clean, col = check_list(combined, 'Part 1 + Supplement')
