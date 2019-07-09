import pymysql


class FilerType:
    def __init__(self, filer):
        self.filer = filer
        self.connection = pymysql.connect(host='nas2.clhjb5xsoxn8.us-east-1.rds.amazonaws.com',
                             user='nas2',
                             password='password',
                             db='nas2',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    
    def query(self):
        try:
        	with self.connection.cursor() as cursor:
                    rows_count = cursor.execute(f"SELECT NodeName FROM OCI7Mode where NodeName = \"{self.filer}\"")
                    if rows_count > 0:
                        self.connection.close()
                        return {"filerType": "7Mode"}
                    rows_count = cursor.execute(f"SELECT NodeName FROM OCICDOT where NodeName = \"{self.filer}\"")
                    if rows_count > 0:
                        self.connection.close()
                        return {"filerType": "CDOT"}
                    else:
                        self.connection.close()
                        return {"filerType": "Invalid Filer"}
        except:
            return {"error": "Error with query to the database. Please check connection to db the backend service can't connect"}        
