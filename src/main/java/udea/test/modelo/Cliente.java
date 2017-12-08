package udea.test.modelo;

/**
 * Created by pabliny193@gmail.com on 05/12/2017.
 */
public class Cliente {

  private String id;
  private String nombre;
  private String telefono;

  public Cliente() {
  }

  public Cliente(String id, String nombre, String telefono) {
    this.id = id;
    this.nombre = nombre;
    this.telefono = telefono;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getTelefono() {
    return telefono;
  }

  public void setTelefono(String telefono) {
    this.telefono = telefono;
  }

  @Override
  public String toString() {
    return "Cliente{" +
            "id='" + id + '\'' +
            ", nombre='" + nombre + '\'' +
            ", telefono='" + telefono + '\'' +
            '}';
  }
}
