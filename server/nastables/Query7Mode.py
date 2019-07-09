import pymysql



class Query7Mode:
    def __init__(self, table='OCI7Mode', filer='', volume='', qtree=''):
        self.table = table
        self.filer = filer
        self.volume = volume
        self.qtree = qtree
        self.connection = pymysql.connect(host='nas2.clhjb5xsoxn8.us-east-1.rds.amazonaws.com',
                             user='nas2',
                             password='password',
                             db='nas2',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    def queryReports(self):
        #Searches just the filer
        data = []

        query = f"Select * from {self.table} where 1=1"
        if self.filer:
            query += f" and NodeName = \"{self.filer}\""
        if self.volume:
            query += f" and VolumeName = \"{self.volume}\""
        if self.qtree:
            query += f" and QtreeName = \"{self.qtree}\""

        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query)
                data = cursor.fetchall()
            self.connection.close()

        except:
            return {"error": "issue with connection or query to the database"}

        return data


    def queryDistinctVolumes(self):
        if self.filer == "":
            return{"errror": {"Object sent for volume distinction without a filer"}}

        with self.connection.cursor() as cursor:
            cursor.execute(f"SELECT DISTINCT VolumeName FROM {self.table} where NodeName=\"{self.filer}\"")
            volumeNames = cursor.fetchall()
        self.connection.close()
        return {"volumeNames": volumeNames}

    def queryDistinctQtrees(self):
        if self.filer == "":
            return{"error": {"Object sent for qtree disinction without filer"}}
        elif self.volume == "":
            with self.connection.cursor() as cursor:
                cursor.execute(f"SELECT DISTINCT QTreeName FROM {self.table} where NodeName=\"{self.filer}\"")
                qtreeNames = cursor.fetchall()
            self.connection.close()
        else:
            with self.connection.cursor() as cursor:
                cursor.execute(f"SELECT DISTINCT QTreeName FROM {self.table} where NodeName=\"{self.filer}\" and VolumeName=\"{self.volume}\"")
                qtreeNames = cursor.fetchall()
            self.connection.close()

        return {"qtreeNames": qtreeNames}
        



