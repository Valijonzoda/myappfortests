import http from "@/http-common";

class GenreDataService {
  getAll(): Promise<any>{
    return http.get("/genres");
  }
}

export default new GenreDataService();