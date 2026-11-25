import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from b2_builder_tool import check_list
from b2_topics_part3 import B2_PART_3_RAW

clean, col = check_list(B2_PART_3_RAW, 'Part 3')
