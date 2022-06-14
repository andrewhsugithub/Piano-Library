import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

s = Service("D:\chromedriver.exe")

music_score_url = []
music_name = []

driver = webdriver.Chrome(service=s) 

for i in range(1,26):
    url = f"https://musescore.com/sheetmusic/piano?page={i}"
    driver.get(url)
    time.sleep(5)

    links = driver.find_elements_by_xpath("//a[contains(@href,'scores') and @class]")
    names = driver.find_elements_by_xpath("//a/h2")
    
    for link in links:
        music_score_url.append(link.get_attribute("href")) 
    for name in names:
        music_name.append(name.get_attribute("innerHTML")) 
    

with open('name.txt', 'w',encoding='utf-8') as f:
    for item in music_name:
        f.write("%s\n" % str(item))
        
with open('url.txt', 'w',encoding='utf-8') as f:
    for item in music_score_url:
        f.write("%s\n" % str(item)) 

print(len(music_score_url),len(music_name))
