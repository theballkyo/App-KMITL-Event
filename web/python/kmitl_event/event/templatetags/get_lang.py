from django import template

register = template.Library()

FIELD_NAME = {
    'name': 'ชื่อกิจกรรม',
    'description': 'รายละเอียดกิจกรรม',
    'start_at': 'วันที่เริ่ม',
    'end_at': 'วันสิ้นสุด',
    'contact_other': 'ข้อมูลการติดต่ออื่นๆ',
    'contact_phone': 'เบอร์โทรศัพท์',
    'contact_email': 'อีเมล์',
    'tags': 'แท็ก',
    'cost': 'ค่าเข้าร่วม',
}

ERROR_NAME = {
    'max_length': 'มีความยาวเกินไป',
    'require': 'ห้ามเป็นค่าว่าง'
}

@register.filter(is_safe=True)
def event_error_lang(field, error):
    return "%s - %s" % (FIELD_NAME[field], ERROR_NAME[error])